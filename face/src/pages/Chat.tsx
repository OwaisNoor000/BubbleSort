import InputBar from '../components/InputBar';
import Header from '../components/Header';
import Message from '../components/Message';
import Response from '../components/Response';
import MessageBoard from '../components/MessageBoard';




export default function Chat() {

  return(
        <div >
            <Header/>
            <MessageBoard>
              <Message text="Magnificent"/>
              <Response text="Magnificent"/>
              
            </MessageBoard>
            <InputBar disableBtn={true}/>
        </div>
  )
}

