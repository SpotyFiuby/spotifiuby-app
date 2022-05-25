import React, { useEffect, useState } from 'react';
import { SignedInStack, SignedOutStack} from './navigation';
import firebase from '../firebase';
import { useSelector } from 'react-redux';

const AuthNavigation = () => {
    const currentUser = useSelector(state => state.auth.currentUser)
    return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation;