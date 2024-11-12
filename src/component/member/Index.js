import Login from "./Login"
import Resgister from "./Register"

function IndexLogin() {
    return (
        <section id="form">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                        <Login />
                    </div>
                    <div className="col-sm-1">
                        <h2 className="or">OR</h2>
                    </div>
                    <div className="col-sm-4">
                        <Resgister />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default IndexLogin