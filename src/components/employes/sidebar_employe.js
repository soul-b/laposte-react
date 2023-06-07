import React, { useState } from 'react';
import './styles/dashboard_employe.scss';
import { Link, useLocation } from 'react-router-dom';

const Sidebar_employe = () => {
    const [startAnimate, setStartAnimate] = React.useState(false);
    const [highlightTopPosition, setStateHighlightTopPosition] = React.useState(0);
    const [currCount, setCurrCount] = React.useState(0);
    const location = useLocation();

    const onClickTab = (count) => {
        setStartAnimate(false);
        setCurrCount(count);
        setStateHighlightTopPosition(count * 52);

        setTimeout(() => {
            setStartAnimate(true);
        }, 100);
    };

    React.useEffect(() => {
        setTimeout(() => {
            setStartAnimate(true);
        }, 500);
    }, []);

    return (
        <div className="container">
            <div className="sidebar">
                <div style={{ top: `${highlightTopPosition}px` }} className={`sidebar__highlight ${startAnimate && 'sidebar__highlight__animate'}`}></div>

                <Link className={location.pathname === '/employe/gestion_import' ? 'active' : ''} to="/employe/gestion_import" onClick={() => onClickTab(0)}>
                    <span className={location.pathname === '/employe/gestion_import' ? 'text-active' : ''}><i className="fas fa-arrow-right"></i> Import</span>
                </Link>
                <Link className={location.pathname === '/employe/gestion_export' ? 'active' : ''} to="/employe/gestion_export" onClick={() => onClickTab(1)}>
                    <span className={location.pathname === '/employe/gestion_export' ? 'text-active' : ''}><i className="fas fa-arrow-right"></i> Export</span>
                </Link>
                <Link className={location.pathname === '/employe/profile' ? 'active' : ''} to="/employe/profile" onClick={() => onClickTab(2)}>
                    <span className={location.pathname === '/employe/profile' ? 'text-active' : ''}><i className="fas fa-arrow-right"></i> Compte</span>
                </Link>
                <Link className={location.pathname === '/employe/logout' ? 'active' : ''} to="/employe/logout" onClick={() => onClickTab(3)}>
                    <span className={location.pathname === '/employe/logout' ? 'text-active' : ''}><i className="fas fa-arrow-right"></i> Deconnexion</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar_employe;
