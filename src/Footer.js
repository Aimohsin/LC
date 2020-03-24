import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer class="main-footer" style={{textAlign:'center'}}>
                    <strong>Copyright &copy; 2020.</strong>
                    All rights reserved.
                    {/* <div class="float-right d-none d-sm-inline-block">
                    <b>Version</b> 3.0.2
                    </div> */}
                </footer>
            </div>
        )
    }
}
