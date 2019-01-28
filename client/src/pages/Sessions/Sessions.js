import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-materialize';
import './Sessions.css';
import Header from '../../components/Header/Header';
import API from '../../utils/API';
import Nav from '../../components/Nav/Nav';
import BAC from '../../components/BAC/BAC';
import DrinkSession from '../../components/DrinkSession/DrinkSession';
// import DrinkBtn from "../../components/DrinkBtn/DrinkBtn";
import SessionBtn from '../../components/SessionBtn/SessionBtn';
import EndBtn from '../../components/EndBtn/EndBtn';
// import { Button } from "react-materialize";
import drinkImg from "../../images/cocktail.png";
import DrinkGauge from "../../components/DrinkGauge/DrinkGauge";
import startBtn from "../../images/startBtn.png"

class Sessions extends Component {
	state = {
		profile: {},
		sub: '',
		username: '',
		sex: '',
		weight: 0,
		session: [
			{
                drink: [],
			},
        ],
        drinkGoal: 0,
		bac: 0,
		maxBAC: 0,
		tts: '',
		sessionID: ''
		};

	componentWillMount() {
		const { userProfile, getUserInfo, userInfo } = this.props.auth;
		if (this.props.auth.isAuthenticated()) {
			let oldToken = localStorage.getItem('access_token');
			let newProfile;
			this.props.auth.lock.getUserInfo(oldToken, (err, profile) => {
				console.log(profile);
				newProfile = profile;
                this.setState({ profile: newProfile });
                let newsub = this.state.profile.sub;
                let newersub = newsub.substr(newsub.length - 8);
                this.setState({ sub: newersub });
                API.getUser(this.state.sub)
			.then(res => {
				if (res.length > 0) {
					console.log('FIND ME' + res);
                    this.setState({ sex: res.data.sex, weight: res.data.weight, session: [] });
					}
				}).catch(API.saveUser({
					sub: newersub,
					}).then(this.loadUser())
				)
        
			});
		} else {
			this.setState({ profile: userProfile });
		}
    }
    
    componentDidMount() {
        console.log("Sub: " + this.state.profile.sub)
        // const { userProfile, getUserInfo, userInfo } = this.props.auth;
        // this.setState({ profile }, () => {
        //     console.log("SUB HERE: " + this.state.profile.sub)
        //     let newsub = this.state.profile.sub;
        //     let newersub = newsub.substr(newsub.length - 8);
        //     this.setState({ sub: newersub });
        //     API.getUser(this.state.sub)
		// 	.then(res => {
		// 		if (res.length > 0) {
		// 			// console.log('FIND ME' + res);
        //             this.setState({ sex: res.data.sex, weight: res.data.weight, session: [] });
		// 			}
		// 		}).catch(API.saveUser({
		// 			sub: newersub,
		// 			}).then(this.loadUser())
		// 		)
        // });
	}

	// componentDidMount() {
	// 	const { userProfile, getUserInfo, userInfo } = this.props.auth;
	// 	if (!userProfile) {
	// 		getUserInfo((err, profile) => {
	// 			this.setState({ profile }, () => {
	// 				let newsub = this.state.profile.sub;
	// 				let newersub = newsub.substr(newsub.length - 8);
	// 				this.setState({ sub: newersub });
	// 				API.getUser(newersub)
	// 					.then(res => {
	// 						if (res.length > 0) {
	// 							console.log('FIND ME' + res);

	// 							this.setState({ sex: res.data.sex, weight: res.data.weight, session: [] });
	// 						}
	// 					})
	// 					.catch(
	// 						API.saveUser({
	// 							sub: newersub,
	// 						}).then(this.loadUser())
	// 					);
	// 			});
	// 		});
	// 	} else {
	// 		this.setState({ profile: userProfile }, this.loadUser());
	// 	}
	// }

	loadUser = () => {
		let newsub = this.state.profile.sub;
		let newersub = newsub.substr(newsub.length - 8);
		API.getUser(newersub)
			.then(res => {
				console.log('FIND ME' + res);

				this.setState({ sex: res.data.sex, weight: res.data.weight, session: [] });
			})
			.catch(err => console.log(err));
	};

	Drink = () => {
		let bac = this.state.bac;
		let weight = this.state.weight;
		let sex = this.state.sex;
		if (sex === 'male' || 'm') {
			if (weight >= 90 && weight < 110) {
				bac += 0.038;
			}
			if (weight >= 110 && weight < 130) {
				bac += 0.031;
			}
			if (weight >= 130 && weight < 150) {
				bac += 0.027;
			}
			if (weight >= 150 && weight < 170) {
				bac += 0.023;
			}
			if (weight >= 170 && weight < 190) {
				bac += 0.021;
			}
			if (weight >= 190 && weight < 210) {
				bac += 0.019;
			}
			if (weight >= 210 && weight < 230) {
				bac += 0.017;
			}
			if (weight >= 230) {
				bac += 0.016;
			}
		}
		if (sex === 'female') {
			if (weight >= 90 && weight < 110) {
				bac += 0.045;
			}
			if (weight >= 110 && weight < 130) {
				bac += 0.038;
			}
			if (weight >= 130 && weight < 150) {
				bac += 0.032;
			}
			if (weight >= 150 && weight < 170) {
				bac += 0.028;
			}
			if (weight >= 170 && weight < 190) {
				bac += 0.025;
			}
			if (weight >= 190 && weight < 210) {
				bac += 0.023;
			}
			if (weight >= 210 && weight < 230) {
				bac += 0.021;
			}
			if (weight >= 230) {
				bac += 0.019;
			}
		}
		// console.log(bac)
		// var current = moment()
		// var difference = startTime.diff(current, "minutes")
		// console.log(difference)
		// difference *= (.015/60)
		// bac -= difference
		// if(bac < 0){
		//     bac = 0
		// }
		let maxBAC = this.state.maxBAC;
		if (bac > maxBAC) {
			this.setState({ maxBAC: bac });
		}
		//console.log(bac)

		//console.log("pressed")
		bac = parseFloat(bac.toFixed(3));
		this.setState({ bac: bac }, this.bacDecay(bac));
	};

	createdDrink = (oz, alcPercent) => {
		let bac = this.state.bac;
		let sex = this.state.sex;
		let weight = this.state.weight;
		if (sex === 'male') {
			let addedBac = (0.071 * oz * alcPercent) / weight;
			bac = addedBac + bac;
		}
		if (sex === 'female') {
			let addedBac = (0.085 * oz * alcPercent) / weight;
			bac = addedBac + bac;
		}
		this.setState({ bac: bac }, this.bacDecay(bac));
	};
	//this function could be used to update the time till sober
	update = () => {
		let bac = this.state.bac;
		this.bacDecay(bac);
	};
	bacDecay = tbac => {
		var moment = require('moment');
		moment().format();
		var minutes = 0;
		//not using state for tbac since state is asynchronous and will not update immediately, which was leading to the time present always one drink behind
		//let tbac = this.state.bac
		//bac reduces at .015 an hour
		//legally sober at .08 bac
		//need to take start time of session, then find the amount of time until bac = 0 at the pace of .015 an hour.
		var bacReductionPerMinute = 0.015 / 60;
		console.log(bacReductionPerMinute);
		while (tbac > 0.08) {
			tbac -= bacReductionPerMinute;
			minutes += 1;
		}
		console.log(minutes);

		//takes current time then adds the amount of minutes until sober, formats into hour:minutes AM/PM
		var TimeOfSober = moment()
			.add(minutes, 'minutes')
			.format('hh:mm a');
		console.log(TimeOfSober);

		//finds difference in minutes between current time and time will sober, though all of this is unnecessary since the minutes variable already knows this information....
		var TimeTillSober = moment().add(minutes, 'minutes');
		var current = moment();
		console.log(TimeTillSober.diff(current, 'minutes'));
		this.setState({ tts: TimeOfSober });
		console.log(this.state.tts);
	};
	End = () => {
		this.setState({ bac: 0, tts: '' });
		API.saveSession({ maxBAC: this.state.maxBAC, endedAt: Date.now })
			.then(res => console.log(res))
			.catch(err => console.log(err));
    };
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

	startSession = () => {
        //event.preventDefault();
        // this.setState({ drinkGoal:  })
		API.saveSession({
            // drinkGoal: this.state.drinkGoal,
            budget: this.state.budget,
			maxBAC: this.state.maxBAC,
			sub: this.state.sub,
			drinkGoal: this.state.drinkGoal
		})
			.then(res => this.setState({ sessionID: res.data._id }))
			.catch(err => console.log(err));
	};

	addDrink = () => {
		//event.preventDefault();
		API.saveDrink({
			sessionid: this.state.sessionID,
		})
			// .then(res => this.loadSessions())
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div>
				<Header />
				<Container>
					<Row>
						<Link
							to="/profile"
							className={window.location.pathname === '/profile' ? 'nav-link active' : 'nav-link'}
						>
							Profile
						</Link>
						{this.state.weight}
					</Row>
					<Row>
						<BAC bac={this.state.bac} tts={this.state.tts} />
					</Row>
					<div className="row">
						<DrinkSession />
					</div>
					<div className="row">
						<img src={drinkImg} bac={this.props.bac} Drink={this.Drink} name="beer" alt="" />
						<img src={drinkImg} bac={this.props.bac} Drink={this.Drink} name="wine" alt="" />
						<img src={drinkImg} bac={this.props.bac} Drink={this.Drink} name="liquor" alt="" />
						<img src={drinkImg} bac={this.props.bac} Drink={this.Drink} name="liquor" alt="" />
					</div>
					{/* <DrinkContainer>
                this.state.sessions.drinks.map(drink=>{
                    return(
                        <DrinkBtn oz=this.props.drink.oz alc= this.props.drink.alc Drink={this.CreatedDrink(drink.oz, drink.alc)} name=this.props.drink.name />
                    )
                })
            
            </DrinkContainer>*/}
					{console.log(this.state.session)}
					<div className="row">
		  			{this.state.sessionID === "" ? 
						<Row className="sessionBtn">
                            <form>
                                <label>
                                    Drink Goal:
                                    <input type="number" name="drinkGoal" onChange={this.handleInputChange} />
                                </label>
									<div onClick={this.startSession} className="start center"><img alt="Start Session" src={startBtn}/></div>
                            </form>
						</Row> :
						<div>
						<Row>
							<div>Have a great time! (responsibly)</div>
						</Row> 
						<Row>
							<Link
							to="/end"
							className={window.location.pathname === '/end' ? 'nav-link active' : 'nav-link'}
							>
							<EndBtn End={this.End} />
							</Link> 				
						</Row>
						<Row>
							<div>Tonight's Progress</div>
						</Row>
						<Row>
							<DrinkGauge DrinkCount={this.state.session[0].drink.length ? this.state.session[0].drink.length : 0} DrinkGoal={this.state.drinkGoal} /> 
						</Row>
						</div>
					  }
					</div>
				</Container>
			</div>
		);
	}
}

export default Sessions;
