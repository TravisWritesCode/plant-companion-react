import React from 'react';

class Popup extends React.Component {
  render() {
    return (
        <div className='popup'>
        <div className='popup_open'>
            <h2>{this.props.text}</h2>
                <form>
                    <label>
                        Pot ID:</label>
                            <input type="text" name="potID"/><br/>
                    <label>
                        Pot Name:</label>
                            <input type="text" name="potName"/><br/>
                    <label>
                        Plant Type:</label>
                            <input type="text" name="potName"/><br/>
                    <br/>
                    <input type="submit" />
                </form>
                <button onClick={this.props.closePopup}>Close Window</button>
        </div>
        </div>
        );
    }
}
export default Popup;