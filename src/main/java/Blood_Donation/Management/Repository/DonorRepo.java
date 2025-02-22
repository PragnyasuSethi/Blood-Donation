package Blood_Donation.Management.Repository;

import Blood_Donation.Management.Model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DonorRepo extends MongoRepository<Donor,String> {
     List<Donor> findByBloodGroup(String bloodGroup);
     List<Donor> findByAge(Integer age);
     List<Donor> findByBloodGroupAndAge(String bloodGroup, Integer age);
}
