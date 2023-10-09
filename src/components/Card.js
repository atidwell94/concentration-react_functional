function Card(props) {
    const {index, style, eventHandler} = props;
    return (
        <div id={index} key={index}
            name="card"
            className="col-sm-2 card"
            style={style}
            onClick={eventHandler}
            >&nbsp;
        </div>
    );
}

export default Card;