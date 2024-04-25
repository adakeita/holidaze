import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useRoleBasedRedirect = (allowedRoles) => {
    const { isAuthenticated, isVenueManager } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            if (allowedRoles.includes('venueManager') && !isVenueManager) {
                navigate('/');
            }
es
        }
    }, [isAuthenticated, isVenueManager, navigate, allowedRoles]);
};

