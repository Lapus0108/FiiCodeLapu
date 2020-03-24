import React from 'react';
import contact_button from "../images/pngwave.png";
import imagineArticol from "../images/vazatest.jpg";
import remove_article from "../images/remove_product.png";
import edit_article from "../images/edit_article.png";

const Produs=[
    {
    id:"1",
    seller_id:"14",
    title:'Vaza veche',
    desc: "Ziua 3 fara pariuri: am pus 100 de lei pe propriul caine", 
    price:"110",
    img:"",
    seller_name:"Danutzz",
    negociabil:true,
    exchangeable:true,
    }
]
console.log(Produs);
class SingleProduct extends React.Component {
    constructor(){
     super();
     this.state={}
    }

    

    render(){

        let ItemPage= Produs.map(item=>{
            return(
                <>
                <div className="container_sgrpoduct_total">
                <div className="sgproduct_container">
                <div className="sgproduct_titleart">Selected article: {item.title}</div>
                <div className="sgproduct_title">Price: {item.price} RON</div>
                <div className="sgproduct_title">Sold by: {item.seller_name}</div>
                {item.negociabil===true ? <div className="sgproduct_conditionals">! Product is negotiable</div> : "" }
                {item.exchangeable===true ? <div className="sgproduct_conditionals">! Product(s) in exchange may be accepted by the seller</div> : "" }
                <div className="sgproduct_title">Description: {item.desc}</div>
                {item.seller_id!=="14" ?
                <div className="sgproduct_contact_button">
                    <div className="sgproduct_button_text">Contact seller:</div>
                    <img src={contact_button} alt="contact_button"></img>
                </div>
                : ""}
                </div>
                <div className="image_container_sgproduct">
                    <img src={imagineArticol} alt="imagine_articol_sgproduct"/>
                </div>

                {item.seller_id=='14' 
                ?
                <div className="seller_tools">
                    <div className="buton_remove_article">
                        <img src={remove_article}/>
                    </div>
                    <div className="buton_edit_article">
                        <img src={edit_article}/>
                    </div>
                </div>
                : "" 
                 }
                </div>
               
                </>

            )
        })

        return(
            <div>{ItemPage}</div>
              )
    }
}
    export default SingleProduct;