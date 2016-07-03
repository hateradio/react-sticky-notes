var Note = React.createClass({
  getInitialState: function () {
    return {editing: false}
  },
  edit: function () {
    this.setState({editing: true});
  },
  save: function () {
    var text = this.refs.newText.getDOMNode().value;

    this.props.onChange(text, this.props.index);

    this.setState({editing: false});
  },
  remove: function () {
    this.props.onRemove(this.props.index);
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
      notes: []
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
  add: function (text) {
    var notes = this.state.notes;
    notes.push(text);
    this.setState({notes: notes});
  },
  update: function (text, i) {
    var notes = this.state.notes;
    notes[i] = text;
    this.setState({notes: notes});
  },
  remove: function (i) {
    var notes = this.state.notes;
    notes.splice(i, 1);
    this.setState({notes: notes});
  },
  eachNote: function (note, i) {
    return (
      <Note key={i}
        index={i}
        onChange={this.update}
        onRemove={this.remove}>{note}</Note>
    );
  },
  render: function () {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
          onClick={this.add.bind(null, "New Note")} />
      </div>
    );
  }
});

React.render(<Board count={10} />,
    document.getElementById('react-container'));
