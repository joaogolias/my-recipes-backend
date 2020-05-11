export class User {
  constructor(private props: UserProps) {}

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get nickname(): string {
    return this.props.nickname;
  }

  get password(): string {
    return this.props.password;
  }

  get email(): string {
    return this.props.email;
  }

  set id(newId: string) {
    this.props.id = newId;
  }

  set name(newName: string) {
    this.props.name = newName;
  }

  set nickname(newNickname: string) {
    this.props.nickname = newNickname;
  }

  set password(newPassword: string) {
    this.props.password = newPassword;
  }

  set email(newEmail: string) {
    this.props.email = newEmail;
  }
}

export interface UserProps {
  id: string;
  name: string;
  nickname: string;
  password: string;
  email: string;
}
