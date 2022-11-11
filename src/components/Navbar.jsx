import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg border navbar-light sticky-top bg-light">

            <div className="navbar-collapse collapse">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item mx-auto">
                        <NavLink className='nav-link' to='/'>Movies</NavLink>
                    </li>
                    <li className="nav-item mx-auto">
                        <NavLink className='nav-link' to='/actors'>Actors</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
