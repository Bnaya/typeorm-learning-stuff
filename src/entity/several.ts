// see https://github.com/typeorm/typeorm/issues/1224#issuecomment-348426495
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(type => UserGroup, userGroup => userGroup.group)
    userGroups: UserGroup[];
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(type => UserGroup, userGroup => userGroup.user)
    userGroups: UserGroup[];
}
@Entity()
export class UserGroup {
    @Column()
    isActive: boolean;
    @ManyToOne(type => User, user => user.userGroups, { primary: true })
    user: User;
    @ManyToOne(type => Group, group => group.userGroups, { primary: true })
    group: Group;
}
