
let PARAMETERS = {
	'incubation-period' : 10 ,
	'recovery-period' : 21 ,
	'transmission-rate' : 2 ,
	'fatility-rate' : 5 ,
	'hospital-capacity' : 80 ,
	'outing-probability' : 50 ,
	'avg-travel-radius' : 7 ,
	'avg-max-encounters' : 14 ,
	'self-quarantining-prob' : 30 ,
	'self-quarantine-strictness' : 20
}

const WIDTH = 5.4 ;
const TOTAL_ROWS = 120 ;
const TOTAL_COLS = 150 ;
const p = TOTAL_ROWS * TOTAL_COLS ;
let P = [] ;
let X_VALUES = [] ;
let DAY = 0 ;
let inHospital = 0 ;
let maxInHosp = Math.round(p*PARAMETERS['hospital-capacity']/100) ;
let INFECTED = 0 ;
let DEAD = 0 ;
let RECOVERED = 0 ;
let SUSC = p ;
let INC = 0 ;
let isFinish = false ;
let stackedLine ;
let SLIDERS = [] ;
let TEXTS = [] ;
let DAYS_PASSED ;
let INF_RATIO ;
let DEATH_RATIO ;
let REC_RATIO ;
let deathRateChanged = false ;

function drawGraph() {
	var ctx = document.getElementById('chart').getContext('2d');
	stackedLine = new Chart( ctx , CONFIG ) ;
}

function addData(chart, label, newValues) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(newValues[0]) ;
	chart.data.datasets[1].data.push(newValues[1]) ;
	chart.data.datasets[2].data.push(newValues[2]) ;
	chart.data.datasets[3].data.push(newValues[3]) ;
    chart.update();
}

function makeSlider( lower , higher , def , step , width , pos ) {
	slider = createSlider(lower,higher,def,step) ;
	slider.position(pos[0], pos[1]);
	slider.style('width', width+'px');
	return slider ;
}

function updateValues() {
	PARAMETERS['incubation-period'] = SLIDERS[0].value() ;
	PARAMETERS['recovery-period'] = SLIDERS[1].value() ;
	PARAMETERS['transmission-rate'] = SLIDERS[2].value() ;
	if ( SLIDERS[3].value() != PARAMETERS['fatility-rate'] )
		deathRateChanged = true ;
	PARAMETERS['fatility-rate'] = SLIDERS[3].value() ;
	PARAMETERS['hospital-capacity'] = SLIDERS[4].value() ;
	maxInHosp = Math.round(p*PARAMETERS['hospital-capacity']/100) ;
	PARAMETERS['outing-probability'] = SLIDERS[5].value() ;
	PARAMETERS['avg-travel-radius'] = SLIDERS[6].value() ;
	PARAMETERS['avg-max-encounters'] = SLIDERS[7].value() ;
	PARAMETERS['self-quarantining-prob'] = SLIDERS[8].value() ;
	PARAMETERS['self-quarantine-strictness'] = SLIDERS[9].value() ;
	TEXTS[0].html( 'INCUBATION PERIOD : '+PARAMETERS['incubation-period']+' DAYS' ) ;
	TEXTS[1].html( 'RECOVERY PERIOD : '+PARAMETERS['recovery-period']+' DAYS' ) ;
	TEXTS[2].html( 'TRANSMISSION RATE : '+PARAMETERS['transmission-rate']+' %' ) ;
	TEXTS[3].html( 'FATALITY RATE : '+PARAMETERS['fatility-rate']+' %' ) ;
	TEXTS[4].html( 'HOSPITAL CAPACITY : '+PARAMETERS['hospital-capacity']+' %' ) ;
	TEXTS[5].html( 'PROBABILITY OF VISITING OUTDOORS : '+PARAMETERS['outing-probability']+' %' ) ;
	TEXTS[6].html( 'AVERAGE RADIUS OF TRAVEL : '+PARAMETERS['avg-travel-radius']+' BLOCKS' ) ;
	TEXTS[7].html( 'AVERAGE NUMBER OF ENCOUNTERS : '+PARAMETERS['avg-max-encounters']+' PEOPLE' ) ;
	TEXTS[8].html( 'PROBABILITY TO SELF-QUARANTINE : '+PARAMETERS['self-quarantining-prob']+' %' ) ;
	TEXTS[9].html( 'SELF-QUARANTINE STRICTNESS : '+PARAMETERS['self-quarantine-strictness']+' %' ) ;
}

function replayVisualisation() {
	stackedLine.data.labels = [] ;
    stackedLine.data.datasets[0].data = [] ;
	stackedLine.data.datasets[1].data = [] ;
	stackedLine.data.datasets[2].data = [] ;
	stackedLine.data.datasets[3].data = [] ;
    stackedLine.update() ;
	
	P = [] ;
	DAY = 0 ;
	inHospital = 0 ;
	INFECTED = 0 ;
	DEAD = 0 ;
	RECOVERED = 0 ;
	SUSC = p ;
	INC = 0;
	isFinish = false ;
	deathRateChanged = false ;
	X_VALUES = [] ;
	
	background(255,255,255) ;
	for ( var i=0 ; i<TOTAL_ROWS ; i++ )
	{
		P.push([]) ;
		for ( var j=0 ; j<TOTAL_COLS ; j++ )
			P[i].push( new SQUARE(i,j) ) ;
	}
	P[int(TOTAL_ROWS/2)][int(TOTAL_COLS/2)].state = 'INC' ;
	P[int(TOTAL_ROWS/2)][int(TOTAL_COLS/2)].color = [246,162,179] ;
	SUSC-- ; INC++ ;
	drawGraph() ;
}

function setup() {
	main = createCanvas(TOTAL_COLS*WIDTH, TOTAL_ROWS*WIDTH) ;
	main.position(32, 120) ;
	
	let play = createButton('REPLAY VISUALISATION') ;
	play.style('background-color', color(255, 140, 0));
	play.style('color', color(255,255,255));
	play.style('font-size', '23px');
	play.style('border-radius', '12px');
	play.style('padding', '12px 12px');
	play.style('border', 'None');
	play.position(900, 735);
	play.mousePressed(function() {play.style('background-color', color(0,0,0))}) ;
	play.mouseReleased(function() {play.style('background-color', color(255,140,0)); replayVisualisation();}) ;
	
	var x = 950 , y = 160 , gap = 59 , w = 530 ;
	SLIDERS.push( makeSlider(1,20,10,1,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(10,40,21,1,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(1,100,3,1,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(1,100,4,1,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(1,100,70,1,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(1,100,50,1,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(0,15,10,1,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(0,80,7,1,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(0,100,30,2,w,[x,y]) ) ; y += gap ;
	SLIDERS.push( makeSlider(0,100,20,2,w,[x,y]) ) ; y += gap ;
	
	var txt , y = 113 , gap = 59 , x = 930 ;
	TEXTS.push(createElement( 'h3' , 'INCUBATION PERIOD : '+PARAMETERS['incubation-period']+' DAYS' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'RECOVERY PERIOD : '+PARAMETERS['recovery-period']+' DAYS' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'TRANSMISSION RATE : '+PARAMETERS['transmission-rate']+' %' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'FATALITY RATE : '+PARAMETERS['fatility-rate']+' %' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'HOSPITAL CAPACITY : '+PARAMETERS['hospital-capacity']+' %' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'PROBABILITY OF VISITING OUTDOORS : '+PARAMETERS['outing-probability']+' %' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'AVERAGE RADIUS OF TRAVEL : '+PARAMETERS['avg-travel-radius']+' BLOCKS' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'AVERAGE NUMBER OF ENCOUNTERS : '+PARAMETERS['avg-max-encounters']+' PEOPLE' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'PROBABILITY TO SELF-QUARANTINE : '+PARAMETERS['self-quarantining-prob']+' %' ).position( x , y )) ;	y += gap ;
	TEXTS.push(createElement( 'h3' , 'SELF-QUARANTINE STRICTNESS : '+PARAMETERS['self-quarantine-strictness']+' %' ).position( x , y )) ;	y += gap ;
	
	var x = 1050 , y = 885 , gap = 60 ;
	DAYS_PASSED = createElement( 'h2' , 'CURRENT DAY : '+DAY ).position( x , y ) ; y += gap ;
	INF_RATIO = createElement( 'h2' , 'INFECTED : '+Math.round(INFECTED*100/p)+' %' ).position( x , y ) ; y += gap ;
	REC_RATIO = createElement( 'h2' , 'RECOVERED : '+Math.round(RECOVERED*100/p)+' %' ).position( x , y ) ; y += gap ;
	DEATH_RATIO = createElement( 'h2' , 'DEAD : '+Math.round(DEAD*100/p)+' %' ).position( x , y ) ;
	
	background(255,255,255) ;
	for ( var i=0 ; i<TOTAL_ROWS ; i++ )
	{
		P.push([]) ;
		for ( var j=0 ; j<TOTAL_COLS ; j++ )
			P[i].push( new SQUARE(i,j) ) ;
	}
	P[int(TOTAL_ROWS/2)][int(TOTAL_COLS/2)].state = 'INC' ;
	P[int(TOTAL_ROWS/2)][int(TOTAL_COLS/2)].color = [246,162,179] ;
	SUSC-- ; INC++ ;
	drawGraph() ;
}

function chooseEncountersRandomly( r , c ) {
	var rs = Math.max(r - PARAMETERS['avg-travel-radius'], 0) ;
	var cs = Math.max(c - PARAMETERS['avg-travel-radius'], 0) ;
	var re = Math.min(r + PARAMETERS['avg-travel-radius'], TOTAL_ROWS-1) ;
	var ce = Math.min(c + PARAMETERS['avg-travel-radius'], TOTAL_COLS-1) ;
	var limit = Math.min(PARAMETERS['avg-max-encounters'], (re-rs+1)*(ce-cs+1)-1) ;
	var enc = [] ;
	for ( var i=rs ; i<=re ; i++ )
		for ( var j=cs ; j<=ce ; j++ )
		{
			if ( i == r && j == c )	continue ;
			enc.push([i,j]) ;
		}
	for ( var i=0 ; i<enc.length ; i++ )
	{
		var x = Math.floor(Math.random() * (enc.length - i) ) + i ;
		var t = enc[x] ;
		enc[x] = enc[i] ;
		enc[i] = t ;
	}
	return enc.slice(0,limit-1) ;
}

function nextDay() {
	DAY ++ ;
	for ( var i=0 ; i<TOTAL_ROWS ; i++ )
		for ( var j=0 ; j<TOTAL_COLS ; j++ )
		{
			if ( deathRateChanged )
			{
				P[i][j].willDie = 100*Math.random() < PARAMETERS['fatility-rate'] ;
				P[i][j].dieAfter = Math.floor( Math.random() * (P[i][j].days_of_disease - PARAMETERS['recovery-period']) ) + PARAMETERS['recovery-period'] ;
			}
			if ( P[i][j].state == 'INF' )
			{
				P[i][j].days_of_disease += 1 ;
				if ( P[i][j].days_of_disease >= PARAMETERS['recovery-period'] )
				{
					INFECTED-- ;
					RECOVERED++ ;
					P[i][j].state = 'REC' ;
					P[i][j].color = [128,128,128] ;
					if ( P[i][j].isHospitalised )
							{ P[i][j].isHospitalised = false; inHospital--; }
					if ( P[i][j].isSelfQuar )
						{ P[i][j].isSelfQuar = false; }
				}
				else 
				{
					if ( P[i][j].willDie && P[i][j].days_of_disease >= P[i][j].dieAfter )
					{
						INFECTED-- ;
						DEAD++ ;
						P[i][j].state = 'DEAD' ;
						P[i][j].color = [0,0,0] ;
					}
				}
				continue ;
			}
			if ( P[i][j].state == 'INC' )
			{
				P[i][j].days_of_incub += 1 ;
				if ( P[i][j].days_of_incub >= PARAMETERS['incubation-period'] )
				{
					INFECTED++ ;
					INC-- ;
					P[i][j].state = 'INF' ;
					P[i][j].color = [220,20,60] ;
					var choice = 100*Math.random() ;
					if ( choice < PARAMETERS['self-quarantining-prob'] )
						{ P[i][j].isSelfQuar = true; P[i][j].color = [0,191,255]; }
					else
						if ( inHospital < maxInHosp )
							{ P[i][j].isHospitalised = true; inHospital++; }
						else
							{ P[i][j].isSelfQuar = true; P[i][j].color = [0,191,255]; }
				}
			}
		}
	
	for ( var i=0 ; i<TOTAL_ROWS ; i++ )
		for ( var j=0 ; j<TOTAL_COLS ; j++ )
		{
			if ( P[i][j].state == 'INF' && P[i][j].isHospitalised )	continue ;
			if ( P[i][j].state == 'INF' && P[i][j].isSelfQuar && PARAMETERS['self-quarantine-strictness']==100 )
				continue ;
			if ( P[i][j].state == 'DEAD' )	continue ;
			if ( P[i][j].state == 'REC' )	continue ;
			if ( P[i][j].state == 'INF' && P[i][j].isSelfQuar )
			{
				var pr = PARAMETERS['outing-probability'] * ( 1 - PARAMETERS['self-quarantine-strictness']/100 ) ;
				var choice = 100*Math.random() < pr ;
				if ( choice )
				{
					var enc = chooseEncountersRandomly(i,j) ;
					for ( var k=0 ; k<enc.length ; k++ )
					{
						x = enc[k] ;
						if ( P[x[0]][x[1]].state == 'SUSC' && 100*Math.random() < PARAMETERS['transmission-rate'] )
						{
							SUSC-- ; INC++ ;
							P[x[0]][x[1]].state = 'INC' ;
							P[x[0]][x[1]].color = [246,162,179] ;
						}
					}
				}
				continue ;
			}
			var choice = 100*Math.random() < PARAMETERS['outing-probability'] ;
			if ( ! choice )	continue ;
			var enc = chooseEncountersRandomly(i,j) ;
			for ( var k=0 ; k<enc.length ; k++ )
			{
				var x = enc[k] ;
				if ( (P[x[0]][x[1]].state == 'INF' || P[x[0]][x[1]].state == 'INC') && P[i][j].state == 'SUSC' )
				{
					if ( 100*Math.random() > PARAMETERS['transmission-rate'] )	continue ;
					SUSC-- ; INC++ ;
					P[i][j].state = 'INC' ;
					P[i][j].color = [246,162,179] ;
					continue ;
				}
				if ( P[x[0]][x[1]].state == 'SUSC' && P[i][j].state == 'INC' )
				{
					if ( 100*Math.random() > PARAMETERS['transmission-rate'] )	continue ;
					SUSC-- ; INC++ ;
					P[x[0]][x[1]].state = 'INC' ;
					P[x[0]][x[1]].color = [246,162,179] ;
				}
			}
		}
	deathRateChanged = false ;
}

function draw() {
	clear() ;
	updateValues() ;
	background(255,255,255) ;
	if ( INFECTED == 0 && INC == 0 )
		isFinish = true ;
	if ( ! isFinish )
		addData(stackedLine, DAY, [INFECTED,RECOVERED,DEAD,SUSC]) ;
	noStroke() ;
	for ( var i=0 ; i<TOTAL_ROWS ; i++ )
		for ( var j=0 ; j<TOTAL_COLS ; j++ )
			{ fill(P[i][j].color); square(j*WIDTH, i*WIDTH, WIDTH); }
	strokeWeight(0.5) ;
	stroke(255,255,255) ;
	for ( var i=0 ; i<=TOTAL_COLS ; i++ )
		line( i*WIDTH , 0 , i*WIDTH , TOTAL_ROWS*WIDTH ) ;
	for ( var i=0 ; i<=TOTAL_ROWS ; i++ )
		line( 0 , i*WIDTH , TOTAL_COLS*WIDTH , i*WIDTH ) ;
	if ( ! isFinish )	nextDay() ;
	DAYS_PASSED.html('CURRENT DAY : '+DAY) ;
	INF_RATIO.html('INFECTED : '+Math.round(INFECTED*100/p)+' %') ;
	REC_RATIO.html('RECOVERED : '+Math.round(RECOVERED*100/p)+' %') ;
	DEATH_RATIO.html('DEAD : '+Math.round(DEAD*100/p)+' %') ;
}