import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionData } from 'src/app/shared/models/excursions-data';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  private excursionsData: ExcursionData[] = []
  public cart: Map<number, number> = new Map<number, number>()
  public totalPrice: number = 0
  public totalReservations: number = 0
  
  constructor(private cartService: CartService, private dataManager: ExcursionDataManagerService){
    dataManager.excursionsData.subscribe(
      {
        next: (data: ExcursionData[]) => this.excursionsData = data,
        error: (err: any) => console.log(err)
      }
    )

    cartService.cart.subscribe(
      {
        next: (cartData: Map<number, number>) =>{
           this.cart = cartData
           this.totalPrice = 0
           this.totalReservations = 0
           for (let [id, reservations] of this.cart){
            this.totalReservations += reservations
            this.totalPrice += this.getPrice(id) * reservations
           }
          },
        error: (err: any) => console.log(err)
      }
    )
  }

  public getPrice(id: number): number{
    for (let excursion of this.excursionsData){
      if (excursion.id == id){
        return excursion.unitPrice
      }
    }

    return 0
  }

  public getReservations(id: number){
    return this.cart.get(id)
  }

  public getCartDetails(id: number){
    for (let excursion of this.excursionsData){
      if (excursion.id == id){
        return excursion
      }
    }

    return null
  }

  public filteredCartDetails(): ExcursionData[]{
    let cartDetails: ExcursionData[] = []

    for (let [id, reservations] of this.cart){
      if (reservations > 0){
        cartDetails.push(this.getCartDetails(id) as ExcursionData)
      }
    }

    return cartDetails
  }
}
