
type elements = {
    id: string
    src: string
    text: string
}

let onboard: elements[] = [
    {
        id:"1",
        src:require('../../images/onboard1.png'),
        text:'Schedule an appointment on the app'
    },
    {
        id:'2',
        src:require('../../images/onboard2.png'),
        text:'Chat with doctors before and after appointments via the Setex app'
    },
    {
        id:'3',
        src:require('../../images/onboard3.png'),
        text:'Track your health activity and medical records at any time'
    },
    {
        id:'4',
        src:require('../../images/onboard4.png'),
        text:'Call for emergency services'
    }
    
]
export default onboard;


   