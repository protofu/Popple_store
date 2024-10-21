package com.popple.reservation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;
import com.popple.reservation.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	List<Reservation> findByUser(User user);

	List<Reservation> findByExhibition(Exhibition exhibition);

}
