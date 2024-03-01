import { ToastContainer as ToastMsgContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastMsg = () => {
  return (
    <ToastMsgContainer
      toastStyle={{ backgroundColor: '#79049F', color: 'white' }}
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default ToastMsg