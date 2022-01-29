import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useDarkMode } from '../../app/stores/store';
import { Header, Image, Table } from 'semantic-ui-react'
export default observer(function UserDataTable() {

  const { adminstore } = useDarkMode()


  return (
    <Table basic='very' celled collapsing >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>DisplayName</Table.HeaderCell>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
          <Table.HeaderCell>University</Table.HeaderCell>
          <Table.HeaderCell>Academic Degree</Table.HeaderCell>
          <Table.HeaderCell>School</Table.HeaderCell>
          <Table.HeaderCell>Profession</Table.HeaderCell>
          <Table.HeaderCell>IsBanned</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          adminstore.users.map(user => (
            <Table.Row onClick={() => adminstore.banUser(user, user.isBanned ? 'Unblock' : 'Ban', user.isBanned ? 'Unblocked' : 'Banned')}>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={user.image || require('../../assets/images/avatar3.jpg').default} rounded size='mini' />
                  <Header.Content>
                    {user?.dsiplayName}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {user?.userName}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {user?.email}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {user?.phoneNumber}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {user?.university}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {user?.academicDegree}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {user?.school}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {user?.profession}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {user?.isBanned ? 'Banned' : 'Okay'}
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
})
