import { useEffect, useState } from 'react';

export const CliCommand: React.FC = () => {
  const [token, setToken] = useState('');
  const [cliCmd, setCliCmd] = useState('Waiting for Firebase Token...');
  const broadcast = new BroadcastChannel('quiz-app');

  useEffect(() => {
    //Receive the token from the service worker and display it           
    broadcast.addEventListener('message', event => {
      console.log('Received', event.data);
      if (event.data && event.data.type === 'TOKEN') {
        setToken(event.data.token);
        RefreshCliCmd(event.data.token);
      }
    });
  }, [broadcast]);

  const RefreshCliCmd = (token: string) => {
    setCliCmd(`curl --header "Content-type: application/json" --header "Authorization:key=AAAAY-KNgis:APA91bEULHdJ1_gOoyuSi3HpQD9ypetoEs2UtgSPtv6c6OjmYaztzpcx6l8ws3lkkdnPOuAH3DXIx09PkI97xTHDDmYBUPLsLgSdXeomvBPEuRmB3d_bMwLguR3gq3s6a9aATIMGebw6" -d '{ "notification": { "title": "Hello","body": "This is Awesome", "icon": "/favicon.ico"},"to" : "${token}"}' https://fcm.googleapis.com/fcm/send`);
  }

  return (
    // <div className="my-4 text-center">
      <div className="my-4 d-flex flex-column align-items-center">
        <div className="p-4 d-grid border border-warning border-4 rounded bg-dark text-white shadow">
          <h4 className='text-center'>Bash Command for Testing Firebase Push Notifications:</h4>
          <p>Run the following Curl command in Bash CLI: </p>
          <textarea value={cliCmd} rows={10} onChange={(e) => setCliCmd(e.target.value)}></textarea>
          <small>You can change the title or body in the cmd</small>
        </div>
      {/* </div> */}
      <button className='mt-4 btn btn-warning btn-lg border border-4 rounded-pill' onClick={() => RefreshCliCmd(token)}>Reset CLI Command</button>
    </div>
  );
};


