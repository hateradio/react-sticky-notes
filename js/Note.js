var Note = React.createClass({
  getInitialState: function () {
    return {editing: false}
  },
  edit: function () {
    this.setState({editing: true});
  },
  save: function () {
    var text = this.refs.newText.getDOMNode().value;

    alert("TODO: Save note value: " + text);

    this.setState({editing: false});
  },
  remove: function () {
    alert('removing note');
  },
  renderDisplay: function () {
    return (
      <div className="note">
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.edit}
            className="btn btn-primary glyphicon glyphicon-pencil" />
          <button onClick={this.remove}
            className="btn btn-danger glyphicon glyphicon-trash" />
        </span>
      </div>
    );
  },
  renderForm: function () {
    return (
      <div className="note">
        <textarea ref="newText" defaultValue={this.props.children}
          className="form-control"></textarea>
        <button onClick={this.save}
          className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
      </div>
    );
  },
  render: function () {
    if (this.state.editing) {
      return this.renderForm();
    }
    return this.renderDisplay();
  }
});

var Board = React.createClass({
  getInitialState: function () {
    return {
      notes: [
        'Call Bill',
        'Email Lisa',
        'Make dentist appt',
        'Send Proposal'
      ]
    };
  },
  propTypes: {
    count: function (props, propName) {
      var property = props[propName];
      if (typeof property !== 'number') {
        return new Error('The count property must be a number');
      }
      if (property > 100) {
        return new Error('Creating ' + property + ' notes is ridiculous');
      }
    }
  },
  render: function () {
    return (
      <div className="board">
        {this.state.notes.map(function (note, i) {
          return (
            <Note key={i}>{note}</Note>
          );
        })}
      </div>
    );
  }
});

React.render(<Board count={10} />,
    document.getElementById('react-container'));
