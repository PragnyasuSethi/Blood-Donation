package Blood_Donation.Management.Service;
import Blood_Donation.Management.Model.Donor;
import Blood_Donation.Management.Repository.DonorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class DonorService {
@Autowired
    private DonorRepo donorRepo;

    public ResponseEntity<?> registerDonor(Donor donor) {
        donorRepo.save(donor);
        return ResponseEntity.ok("Donor registered successfully");
    }

    public List<Donor> searchDonor(String bloodGroup, Integer age) {
        return donorRepo.findByBloodGroupAndAge(bloodGroup, age);
    }

    // Search donor by only blood group
    public List<Donor> searchByBloodGroup(String bloodGroup) {
        bloodGroup = bloodGroup.trim();
        System.out.println("Searching for Blood Group: [" + bloodGroup + "]");
        List<Donor> donors = donorRepo.findByBloodGroup(bloodGroup);

        System.out.println("Found Donors: " + donors);

        return donors;
    }

    public List<Donor> searchByAge(Integer age) {
        return donorRepo.findByAge(age);
    }
}
