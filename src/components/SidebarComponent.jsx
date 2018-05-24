import React from 'react';
import '../_css/SideBarComponent.css';

const SidebarComponenet = () => {
    return (
        <div id="sidebar">
            <img id="andela-logo" src="https://lh3.googleusercontent.com/jF3nL-15f5UfJyTZe16-smK3YC-_aAyqK96cVD8Usr8yg82KOsxgPohsSHmBi87buyMW1oWezz50Q1o=w2880-h1606-rw" alt="" />
            <div id="sidebar-links">
                <ul>
                    <li>Analytics</li>
                    <li>Users</li>
                    <li>Assets</li>
                    <li>Reports</li>
                    <li>Feedback</li>
                </ul>
            </div>
        </div>
    )
};

export default SidebarComponenet;