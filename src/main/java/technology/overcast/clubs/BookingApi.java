package technology.overcast.clubs;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;
import org.eclipse.microprofile.graphql.Source;
import technology.overcast.clubs.model.Booking;
import technology.overcast.clubs.model.Slot;

@GraphQLApi
public class BookingApi {
    
    @Query
    public List<Booking> getBookings(Optional<LocalDate> forDate) {
        if(forDate.isPresent()){
            return Booking.findForDate(forDate.get());
        }else{
            return Booking.findForToday();
        }
    }
    
    public List<Slot> getSlot(@Source List<Booking> bookings){
        List<Integer> slotList = bookings.stream().map(booking -> booking.slot).collect(Collectors.toList());
        return Slot.listSlots(slotList);
    }
    
}