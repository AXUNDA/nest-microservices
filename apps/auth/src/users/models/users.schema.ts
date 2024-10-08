import { AbstractDocument } from '@app/common/database';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(UserDocument);
