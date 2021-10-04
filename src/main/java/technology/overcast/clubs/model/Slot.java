package technology.overcast.clubs.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;

/**
 * Slots POJO
 * 
 * @author Phillip Kruger (phillip.kruger@gmail.com)
 */
@Entity
public class Slot extends PanacheEntity {

    public int slot;
    public LocalTime startTime;
    public LocalTime endTime;
    public boolean peak;
    
    public static List<Slot> listSlots(List<Integer> slots){
        List<Slot> slotList = new ArrayList<>();
        for(Integer slot:slots){
            slotList.add(find("slot", slot).firstResult());
        }
        return slotList;
    }
    
    public static Slot findBySlot(int slot){
        return find("slot", slot).firstResult();
    }
    
}
