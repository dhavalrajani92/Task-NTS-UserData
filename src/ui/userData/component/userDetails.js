import React,{Component} from "react";


export const UserDetails = function ({userDetails}){
    return (
        <div className={"table-responsive-vertical table-striped card-main card-default z-depth"}>
            <table id="table" className="table table-hover" cellSpacing="0" cellPadding="0">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Age</th>
                    <th>Hobbies</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-title="username">{userDetails.username}</td>
                        <td data-title="age">{userDetails.age}</td>
                        <td data-title="hobbies">{userDetails.hobbies.join(",")}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
