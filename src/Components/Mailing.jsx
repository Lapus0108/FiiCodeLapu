import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Mailing extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <>
            <div class="container-fluid">
                     <div class="row"> 
                        <div class="col 6">
                            <h class="titlu_mailing">How to send your letter correctly?</h>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <p class="mailing_paragraph mx-auto">Step 1: Writing the letter</p>
                            <div className="mailing_paragraph_content px-2">Considering the purpose of our site and letters as a way of communication between the seller and the buyer, there are some important aspects which should be approached in the content. First of all, don't forget to include details about the transaction, such as:</div>
                            <li className="li px-2">Price and quantity</li>
                            <li className="li px-2">Shipping( way of shipping, shipping price and estimated time)</li>
                            <li className="li px-2">Include more details about the order if not clear</li>
                            <li className="li px-2">As a seller, you should give more details about the products if requested</li>
                         </div>
                    </div>
                            
                    <div class="mailing_paragraph mx-auto">Step 2: Envelope inscription</div>
                        <div className="mailing_paragraph_content px-2">On envelopes or parcels, the address of a single consignee and a single consignor must be written. The addresses are written clearly, correctly and completely. It is forbidden to use in writing the address of the recipient and the sender of writing instruments that can be erased (pencil) or that do not provide a quality print.</div>
                        <div className="mailing_paragraph_content  px-2">The addresses of the consignor and the consignee shall be inscribed on the length of the parcel or envelope (parallel to the longest side of the postal item), without spaces and without spacing the letters.</div>
                        <div className="mailing_paragraph_content  px-2">The addresses of the consignee and the sender are registered using Latin letters (a, b, c ... x, y, z) and Arabic numerals (0, 1, 2 ... ..9), without deletions, corrections or thickening of the documents.</div>
                        <div className="mailing_paragraph_content  px-2">On envelopes, parcels or postage stamps, the consignee is placed in the lower right corner of the face of the postal item. The face of an envelope is the opposite side of the lid. The consignor passes in the upper left corner of the postal item. On the envelopes with cover, the sender can also pass on their back (on the cover).</div>
                        <div className="spacer"></div>
                        <div className="mailing_paragraph_content  px-2">Both the consignor and the consignee detalis must include this elements:</div>
                        
                            <li className="li px-2">Row 1: Last name & First name (the clear name, without abbreviations, of the legal person).</li>
                            <li className="li px-2">Row 2: Street name followed by number of building or block, staircase, floor, apartment</li>
                            <li className="li px-2">Row 3: Postal code and locality (in capital letters). For the rural area, the locality is registered followed by the name of the commune to which it belongs.</li>
                            <li className="li px-2">Row 4: The county or sector(for Bucharest only). In the situation where the locality is a county residence and corresponds as a name with that of the county to which it belongs, it can be omitted.</li>
                            <li className="li px-2">Row 5: Country of recipient (in capital letters).</li>
                    <div class="mx-auto mailing_paragraph">Step 3: Postal stamp application and sending</div>
                        <div className="mailing_paragraph_content px-2">Postage stamps (also called postage stamps) are printed issued or accepted by the postal administration of a state, often laced and of small size, which serve as an advance payment for a postal service, called postage. The postage stamp is affixed to the envelope by the sender, to be canceled by obliteration with a manual or mechanical stamp by a post office.</div>
                        <div className="spacer"></div>
                        <div className="mailing_paragraph_content px-2">Stamps of various values ​​stick to the envelope, on its face, in the upper right corner, as shown in the image below. Some envelopes have already printed stamps of a certain value on them.</div>
                        <div className="mailing_paragraph_content px-2">The last step is to place it in a postal box from which it will be collected and send. If you don't know where are these boxes located you can check our map!</div>
                        <Link to="/map" style={{color:"red", fontWeight:600}}>Find the closest postal office</Link>
                    <div class="mx-auto mailing_paragraph">Step 4: Wait for response and keep it going!</div>
                    
                    <div className="footer_mailing px-2"> You can find more details about sending letters and postal packages on the website of the Romanian Post:</div>
                    <a style={{color:"red", fontWeight:600}} href ="https://www.posta-romana.ro/">Just click here</a>
                    
            </div> 
            <div className="spatiu_gol_mailing"></div>
         </>   
        )
    }
}

