import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    url: string;

    @Column()
    public_id: string;

    @Column()
    softDelete:boolean

    @CreateDateColumn()
    dateCreated?: Date;

    @UpdateDateColumn()
    dateUpdated?: Date;

    @Column()
    status: string;

}