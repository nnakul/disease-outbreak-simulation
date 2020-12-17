
const CONFIG = 
{
	type : 'line' ,
	data : {
				labels : X_VALUES ,
				datasets : [
								{
									label : 'INFECTED' ,
									data : [] ,
									backgroundColor : 'rgba(255,99,132,1)' ,
									borderColor : 'rgba(255,99,132,1)' ,
									borderWidth : 2 ,
									pointBorderWidth : 0 ,
									radius : 0
								} ,
								{
									label : 'RECOVERED' ,
									data : [] ,
									backgroundColor : 'rgba(128,128,128,1)' ,
									borderColor : 'rgba(128,128,128,1)' ,
									borderWidth : 2 ,
									pointBorderWidth : 0 ,
									radius : 0
								} ,
								{
									label : 'DEAD' ,
									data : [] ,
									backgroundColor : 'rgba(0,0,0,1)' ,
									borderColor : 'rgba(0,0,0,1)' ,
									borderWidth : 2 ,
									pointBorderWidth : 0 ,
									radius : 0
								} ,
								{
									label : 'SUSCEPTIBLE' ,
									data : [SUSC] ,
									backgroundColor : 'rgba(211,211,211,1)' ,
									borderColor : 'rgba(211,211,211,1)' ,
									borderWidth : 2 ,
									pointBorderWidth : 0 ,
									radius : 0
								}
							]
			} ,
	options: {
				scales: {
							xAxes: [{
										ticks: {
													display: false ,
													scaleLabel: {
																	display: true,
																	labelString: 'NUMBER OF DAYS PASSED'
																}
												} ,
										gridLines: {
														color: "rgba(0, 0, 0, 0)"
													}

									}] ,
							yAxes: [{
										ticks: {
													display: false ,
													ticks: {
																beginAtZero: true,
															} ,
											   } ,
										gridLines: {
														color: "rgba(0, 0, 0, 0)",
													} ,
										stacked : true

									}]
						}
			}
}