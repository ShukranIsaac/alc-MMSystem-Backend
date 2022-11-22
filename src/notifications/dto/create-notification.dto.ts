import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationDto {
    @Field()
    id: number;

    @Field()
    name: string;

    // @Field()
    // publisher: number;
}
