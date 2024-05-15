import React from 'react'

interface IConnectionState {
  isConnected: boolean
}
export const ConnectionState: React.FC<IConnectionState> = ({ isConnected }) => {
  return <p>State: {'' + isConnected}</p>
}