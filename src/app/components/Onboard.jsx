import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import onboard from '../data/OnboardData';



export default function Onboard(){
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
        flexDirection: "column"
    }

    return(
        <div className="slide-container">
            <Slide>
                {onboard.map((image) => (
                    <div className='' key={image.id} style={{...divStyle, backgroundColor:'#263A5C'}}> 
                        <img src={image.src} alt="" 
                        style={{width:'45%', height:'50%', display:"flex", marginTop:"25%"}}
                        />
                        <h2  className='text-[#FBFBFB] sm:text-2xl h-[10%] mb-40 w-80% m-[50px] text-center'  >{image.text}</h2>
                    </div>
                ))}
            

            </Slide>
           
            
        </div>
    )

}