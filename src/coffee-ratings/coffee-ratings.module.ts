import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { CoffeeRatingService } from '../coffee-rating/coffee-rating.service';

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingsModule {}
