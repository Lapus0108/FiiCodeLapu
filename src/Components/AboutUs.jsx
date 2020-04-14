import React, {Component} from 'react';
import {Card, Elevation} from '@blueprintjs/core';
import Lapu from '../assets/images/about/Lapu.jpg';
import Mihnea from '../assets/images/about/Mihneaa.JPG';
import back_button from '../assets/images/Icons/Back-button.svg';

export default class AboutUs extends Component {
    constructor() {
        super();
        this.state = {}
    }

    goBack=()=>{
        this.props.history.goBack();
    }

    render() {
        return (
            <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col 6">
                        <h class="display-1 font-main">About US</h>
                        <div className="h1 font-main">Piazeta - the online marketplace meant for the exchange of "retro"
                            goods
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div className="col-lg-2"/>
                    <div className="col-lg-8">
                        <Card interactive={false} elevation={Elevation.FOUR}
                              className="background-primary text-lg-left mb-3">
                            <div className="h3">How does it work?</div>
                            <div className="p">The websites main page consists in a list of products that follows the
                                retro theme. From there you can search for the collectible that you are missing ( be it
                                a poster, a book or even something bigger like a car ) and place an order. The seller
                                will receive an email about your placed order and then he can choose whether to accept
                                or deny it. You’ll be notified by email about his choice, and in the case it is
                                confirmed you’ll receive his contact information. But be careful, he will receive yours
                                as well so no scamming can take place. However, you must first create an account to be
                                able to use all our functionalities. By creating one, you admit to giving out your TRUE
                                personal information ( that we cannot see ) that can later be used in the exchange of
                                products. Piazeta reserves its right to eliminate any of its users if they don’t follow
                                the Terms & Conditions that are imposed.
                            </div>
                        </Card>
                        <Card interactive={false} elevation={Elevation.FOUR}
                              className="background-primary text-lg-left mb-3">
                            <div className="h3">The Reason</div>
                            <div className="p">Todays society has a tendency to forget its roots and to preserve its
                                historical goods. It is harder and harder to find historical pieces and even more to
                                build up a collection of them. We, the Piazeta Team, as true lovers of the Retro Epoch
                                and as part-time collectors, wanted to break the gap and come with an easy to use
                                platform for goods exchange that is entirely dedicated to the 60s. Therefore, we got on
                                to work and started building the environment you see today. Almost two months later, we
                                are ready to announce the Release of the Alpha Version of Piazeta. The website is still
                                in the works and we encourage you to send us your suggestions over on
                                piazetaro@gmail.com
                            </div>
                        </Card>
                        <Card interactive={false} elevation={Elevation.FOUR}
                              className="background-primary text-lg-left mb-3">
                            <div className="h3">Who are we?</div>
                            <div className="p">We are a pair of friends from National College Iasi. Our history starts
                                way back in 2012 when we first met in the 5th grade. Almost 8 years later, at the (sad)
                                end of the amazing high school period, with a lot of great memories together, we decided
                                to team up and try our programming skills to build up something useful for the
                                community. Although we have behind little to almost no real work experience, and 0
                                educational preparation in this domain, we used our self-taught abilities and the mighty
                                help of Udemy, Laracasts, StackOverflow and many many other articles to try and venture
                                out. In the end, a person can truly learn only by doing and we can say this was an
                                amazing experience for the both of us.
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <Card interactive={false} className="background-primary text-lg-left mt-2">
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <img className="img-fluid img-thumbnail" src={Mihnea} alt="Lapu"/>
                                            </div>
                                            <div className="col-lg-7 text-lg-left">
                                                <div className="h2">Radu Mihnea</div>
                                                <div className="p">I’m an ambitious, calm, friendly and learn-hungry
                                                    high-school senior. I’ve always been a lover of technology. Since I
                                                    was little I loved building stuff on my own and playing with
                                                    anything on the computer. As the years passed by, the passion only
                                                    continued to grow and so did my will to learn.
                                                </div>
                                                <br/>
                                                <div className="p">My first real encounter with programming was in the 9th
                                                    grade when I signed up for a game-development contest with a couple of
                                                    my friends. Afterwards, I tried CTFs, long Hackathons and some
                                                    algorithmics also.
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="p">However, nothing took shape, I didn’t find the
                                                motivation to actually learn something and complete a task. That changed
                                                2 years ago when I used my whole summer to learn React-Native and
                                                Node.js to build some mobile apps. Last summer, I started learning
                                                Laravel and PHP to better shape up my back-end abilities. I also
                                                designed two websites for two NPOs.
                                            </div>
                                            <br/>
                                            <div className="p">Other than programming, I love sports, philosophy, puzzle
                                                and spending time with my family. I’m also the President of Interact
                                                Club Iasi, where I learned about the importance of team-work, dedication
                                                and responsibility, all while trying to improve the local community. I
                                                truly believe that nothing is impossible if you work hard enough.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-lg-6">
                                    <Card interactive={false} className="background-primary text-lg-left mt-2">
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <img className="img-fluid img-thumbnail" src={Lapu} alt="Lapu"/>
                                            </div>
                                            <div className="col-lg-7 text-lg-left">
                                                <div className="h2">Lapusneanu Andrei</div>
                                                <div className="p">In the last years, my path to the field of technology
                                                    has become more and more clear and I strongly feel this is my
                                                    calling, in which I have invested a lot of work, time and
                                                    dedication. I wish to continue studying at the Faculty of Computer
                                                    Science in Iasi, guided by most of my hobbies, such as programming,
                                                    robots building and engineering.
                                                </div>
                                                <br/>
                                            </div>
                                            <div className="p">The last 2 years have been essential in my development as
                                                a programmer, Firstly because I have been part of an Internship from
                                                which I gained a lot of experience in coding, mainly in ReactJS and
                                                React Native, but also in other auxiliary platforms.This experience
                                                also showed me how life looks like for a company in the IT field and
                                                besides this I have done many online tutorials which really helped me to
                                                understand more than the basics.
                                            </div>
                                            <br/>
                                            <div className="p">I consider myself a very dedicated, hard-working and
                                                sociable person, qualities that helped me build relationships with
                                                valuable people from all the fields. More than that, sports represent a
                                                significant part of my life, which truly contributes to a general state
                                                of joy and energy.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Card>
                        <Card interactive={false} elevation={Elevation.FOUR}
                              className="background-primary text-lg-left mb-3">
                            <div className="h3">The Future</div>
                            <div className="p">Going so far and just giving up isn’t our way of doing things. Therefore,
                                we will continue to add different utilities to the website for the good of our users.
                                Our plan as of now looks as follows: a review system for users ( so you can better tell
                                whom you’re trading with ); a more advanced filtering possibility; a wider range of
                                notifications ( built in notifications on the website so you won’t have to check your
                                mail every-time ); a built-in messaging system to eliminate any doubts about the product
                                you’re buying or the person you’re selling to; a mobile app for the more practical ( and
                                lazy ) between us; and many more… As we said before, this is just an Alpha versions,
                                there might still be things we’ll have to add, so please, send us an
                                email without hesitation, we can’t wait to hear for your feedback.
                            </div>
                            <br/>
                            <div className="p">With much love,</div>
                            <div className="h5">The Piazeta Team</div>
                        </Card>
                    </div>
                    <div className="col-lg-2"/>
                </div>
            </div>
            <div class="row justify-content-center">
                <img src={back_button} onClick={this.goBack} style={{height:32, backgroundColor:"darkred", borderRadius:15, marginTop: 7}}/>
            </div>
            <div className="spatiu_gol"/>
            </>
        )
    }
}
