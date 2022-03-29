package technology.overcast.booking.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.panache.common.Parameters;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.NoResultException;
import org.eclipse.microprofile.graphql.Name;

/**
 * Booking POJO
 * 
 * @author Phillip Kruger (phillip.kruger@gmail.com)
 */
@Entity
public class Booking extends PanacheEntity {

    public LocalDateTime madeOn;
    public String madeBy;
    public LocalDate forDate;
    @Name("slotIndex")
    public int slot;
    public int court;
    @ElementCollection(targetClass=String.class)
    public List<String> players;
    
    public static List<Booking> findForToday(){
        return findForDate(LocalDate.now());
    }
    
    public static List<Booking> findForDate(LocalDate forDate){
        return list("forDate", forDate);
    }
    
    public static Booking findForTodayAndSlotAndCourt(int slot, int court){
        return findForDateAndSlotAndCourt(LocalDate.now(), slot, court);
    }
    
    public static Booking findForDateAndSlotAndCourt(LocalDate forDate, int slot, int court){
        try {
            return find("select b from Booking b where b.forDate=:forDate and b.slot=:slot and b.court=:court", 
                Parameters.with("forDate", forDate)
                        .and("slot", slot)
                        .and("court", court)).singleResult();
        }catch(NoResultException nre){
            return null;
        }
    }
    
    
}
