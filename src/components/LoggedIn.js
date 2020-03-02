import React from 'react';
import Text from '../text/text.json'
import '../App.css';

export default function LoggedIn(props) {
    console.log(props)
    return (
        <div className="signUpBackground">
            <h4> Här finns all din information sparad.</h4>
            <table>
                <thead>
                    <tr>
                        <th>Stad</th>
                        <th>Kök</th>
                        <th>Badrum</th>
                        <th>Utomhusfärg</th>
                    </tr>
                </thead>
                <tbody>
                    {Text.map((data) =>
                        <tr>
                            <td>{data.Title}</td>
                            <td>{data.Kitchen}</td>
                            <td>{data.Bathroom}</td>
                            <td>{data.OutColor}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="buttons" style={{ marginTop: "30px" }} onClick={props.logOut}>Log out</button>
        </div>



    )

}