import { useEffect, useState } from 'react';

export const CliCommand: React.FC = () => {
  const [token, setToken] = useState('');
  const broadcast = new BroadcastChannel('quiz-app');

  useEffect(() => {
    //Receive the token from the service worker and display it           
    broadcast.addEventListener('message', event => {
      console.log('Received', event.data);
      if (event.data && event.data.type === 'TOKEN') {
        setToken(event.data.token);
      }
    });
  }, [broadcast]);

  return (
    <div className="my-5 d-flex justify-content-center">
      <div className="p-4 d-grid border border-info border-4 rounded bg-dark text-white shadow">
        <h4 className='text-warning text-center'>Bash Command for Testing Firebase Push Notifications:</h4>
        <p>Run the following Curl command in Bash CLI: </p>
        <kbd className='text-break border'>{`curl --header "Content-type: application/json" --header "Authorization:key=AAAAY-KNgis:APA91bEULHdJ1_gOoyuSi3HpQD9ypetoEs2UtgSPtv6c6OjmYaztzpcx6l8ws3lkkdnPOuAH3DXIx09PkI97xTHDDmYBUPLsLgSdXeomvBPEuRmB3d_bMwLguR3gq3s6a9aATIMGebw6" -d '{ "notification": { "title": "Hello","body": "This is Awesome", "icon": "/favicon.ico"},"to" : "${token}"}' https://fcm.googleapis.com/fcm/send`}</kbd>
      </div>
    </div>
  );
};
