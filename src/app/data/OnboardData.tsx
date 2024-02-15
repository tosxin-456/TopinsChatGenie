
type elements = {
    id: string
    src: string
    text: string
}

let onboard: elements[] = [
    {
        id:"1",
        src:require('../../images/onboard1.png'),
        text:'Mark schedules for appointments'
    },
    {
        id:'2',
        src:require('../../images/onboard2.png'),
        text:'Chat with an A.I on all health related problems'
    },
    {
        id:'3',
        src:require('../../images/onboard3.png'),
        text:'Track your health activity and monitor schedule progress'
    },
    {
        id:'4',
        src:require('../../images/onboard4.png'),
        text:'Call for emergency services'
    }
    
]
export default onboard;


   