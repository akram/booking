package technology.overcast.clubs;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;
import org.eclipse.microprofile.graphql.Source;
import technology.overcast.clubs.model.Slot;
import technology.overcast.clubs.model.Booking;

@GraphQLApi
public class SlotApi {
    
    @Query
    public List<Slot> getSlots() {
        return Slot.listAll();
    }
    
    @Query
    public Slot getSlot(int slot){
        return Slot.findBySlot(slot);
    }
    
    
    // TODO: Log  a bug for batch and multiple (with extra params)
    
    public Booking getBooking(@Source Slot slot, Optional<LocalDate> forDate, int court){
        LocalDate day = LocalDate.now();
        if(forDate.isPresent()){
            day = forDate.get();
        }
        
        return Booking.findForDateAndSlotAndCourt(day, slot.slot, court);
    }
}