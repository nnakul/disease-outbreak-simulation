
class SQUARE {
	constructor ( r , c ) {
		this.row = r ;
		this.col = c ;
		this.state = 'SUSC' ;
		this.color = [211,211,211] ; // light-grey
		this.days_of_disease = 0 ;
		this.days_of_incub = 0 ;
		this.isSelfQuar = false ;
		this.willDie = 100*Math.random() < PARAMETERS['fatility-rate'] ;
		this.dieAfter = Math.floor(Math.random() * (int(PARAMETERS['recovery-period']/3) - PARAMETERS['recovery-period']) ) + PARAMETERS['recovery-period'] ;
		this.isHospitalised = false ;
	}
}