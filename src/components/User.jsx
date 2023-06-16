function User({ id, name, surname, roles }) {
  return (
    <div className="news">
      <p>Имя: {name}</p>
      <p>Фамилия: {surname}</p>
      <p>Роли: {roles.join(", ")}</p>
      {isConditionMet && (
        <div>
          <button onClick={this.handleAddRole}>Add Role</button>
          <button onClick={this.handleRemoveRole}>Remove Role</button>
        </div>
      )}
    </div>
  );
}
