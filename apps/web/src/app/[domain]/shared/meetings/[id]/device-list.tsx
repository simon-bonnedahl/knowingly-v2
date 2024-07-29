import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@knowingly/ui/select';
import { useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react';
import { Icon, IconKey, Icons } from '@knowingly/icons';
interface DeviceSelectorProps  {
icon: IconKey;
  devices: MediaDeviceInfo[];
  selectedDeviceId?: string;
  onSelect: (deviceId: string) => void;
};

export const DeviceSelector = ({
  icon,
  devices,
  selectedDeviceId,
  onSelect,
}: DeviceSelectorProps) => {
  return (
    <Select defaultValue={selectedDeviceId}>
      <SelectTrigger className="w-[250px] flex gap-1 items-center text-xs">
      <Icon name={icon} className="w-4 h-4 text-muted-foreground" />

        <SelectValue placeholder="Select a device" />
      </SelectTrigger>
      <SelectContent>
        {devices.map((device) => 
                <SelectItem
                key={device.deviceId}
                value={device.deviceId}
                onClick={() => onSelect(device.deviceId)}
                >
                {device.label}
                </SelectItem>
        )}
         
      </SelectContent>
    </Select>
    // <div className="selector">
    //   {devices.map((device) => {
    //     const selected = selectedDeviceId === device.deviceId;
    //     return (
    //       <div
    //         key={device.deviceId}
    //         className={`option ${selected ? 'option--selected' : ''}`}
    //         onClick={() => onSelect(device.deviceId)}
    //       >
    //         {device.label}
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export const AudioInputDeviceSelector = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, devices, selectedDevice } = useMicrophoneState();
  return (
    <DeviceSelector
     icon="microphone"
      devices={devices || []}
      selectedDeviceId={selectedDevice}
      onSelect={(deviceId) => microphone.select(deviceId)}
    />

  );
};

export const VideoInputDeviceSelector = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, devices, selectedDevice } = useCameraState();
  return (
    <DeviceSelector
     icon="video"
      devices={devices || []}
      selectedDeviceId={selectedDevice}
      onSelect={(deviceId) => camera.select(deviceId)}
    />
  );
};

export const AudioOutputDeviceSelector = () => {
  const { useSpeakerState } = useCallStateHooks();
  const { speaker, devices, selectedDevice, isDeviceSelectionSupported } =
    useSpeakerState();

  if (!isDeviceSelectionSupported) return null;
  return (
    <div>
    <DeviceSelector
      icon="deviceSpeaker"
      devices={devices || []}
      selectedDeviceId={selectedDevice}
      onSelect={(deviceId) => speaker.select(deviceId)}
    />
    </div>
  );
};