import { messaging } from '../Services/FirebaseMsgService'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


export const Notification: React.FC = () => {

    messaging.onMessage((payload) => {
        console.log('onMessage received', payload);

        toast.dark(`${payload.notification.title}: ${payload.notification.body}`)
    })

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                draggable
                transition={Slide}
                hideProgressBar={true}
            />
        </div>
    );
}