import { Button } from '@knowingly/ui/button';
import { useEffect, useState } from 'react';

const PermissionPrompt = () => {
  const [permissionState, setPermissionState] = useState({
    camera: 'pending',
    microphone: 'pending',
  });

  const requestPermissions = async () => {
    try {
      const cameraPermission = await navigator.mediaDevices.getUserMedia({ video: true });
      const microphonePermission = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (cameraPermission) {
        setPermissionState((prevState) => ({ ...prevState, camera: 'granted' }));
      }
      if (microphonePermission) {
        setPermissionState((prevState) => ({ ...prevState, microphone: 'granted' }));
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setPermissionState((prevState) => ({
        ...prevState,
        camera: 'denied',
        microphone: 'denied',
      }));
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleRetry = () => {
    setPermissionState({
      camera: 'pending',
      microphone: 'pending',
    });
    requestPermissions();
  };

  if (permissionState.camera === 'granted' && permissionState.microphone === 'granted') {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-2xl font-bold">Permissions Required</h1>
      <p>We need access to your camera and microphone to proceed.</p>
      {permissionState.camera === 'denied' && <p>Camera permission denied. Please allow camera access.</p>}
      {permissionState.microphone === 'denied' && <p>Microphone permission denied. Please allow microphone access.</p>}
      <Button onClick={handleRetry}>Retry</Button>
    </div>
  );
};

export default PermissionPrompt;
