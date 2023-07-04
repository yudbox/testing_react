import React from "react";

function UserList({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Emails</th>
        </tr>
      </thead>
      {/* data-testid используется только для тестирования. см. описание в тесте */}
      <tbody data-testid="users-table">
        {users.map((user) => {
          return (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserList;
