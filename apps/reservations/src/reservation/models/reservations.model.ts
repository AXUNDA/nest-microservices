import { AbstractDocument } from '@app/common/database';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class ReservationsDocument extends AbstractDocument {
  @Prop()
  timeStamp: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  // @Prop()
  // placeId: string;

  @Prop()
  invoiceId: string;
}

export const ReservationsSchema =
  SchemaFactory.createForClass(ReservationsDocument);
