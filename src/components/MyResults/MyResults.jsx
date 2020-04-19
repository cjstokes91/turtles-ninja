import React from 'react';

class myResults extends React.Component {
    render() {
        return (
            <div className='myresults'>{this.props.myResults.map((result, idx) => {
                return (
                    <div>
                        <div className='result' key={idx}>
                            <div>
                                COWABUNGA!!!! you are most like
                        </div>
                            <div className='name'>
                                <strong>Name: {result.name}</strong>
                            </div>
                            <div>
                                <strong>
                                    Age: {result.age}
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    Favorite Weapon: {result.weapon}
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    Personality Type: {result.personality}
                                </strong>
                            </div>
                            <div>
                                <img alt={''} src={result.img} />
                            </div>
                            <button type="button" class="btn btn-danger" onClick={() => this.props.handleDeleteResult(result._id)}>Delete Character</button>
                            <div>
                            </div>
                        </div>
                    </div>)
            })}</div>

        )
    }
}
export default myResults; 