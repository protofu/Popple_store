package com.popple.reservation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;
import com.popple.reservation.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	List<Reservation> findByUser(User user);

	List<Reservation> findByExhibition(Exhibition exhibition);

	@Query("SELECT r FROM Reservation r WHERE r.exhibition = :exhibition and r.user = :user")
	List<Reservation> findByExhibitionAndUser(@Param("exhibition")Exhibition exhibition, @Param("user") User user);

	Optional<Reservation> findByUserIdAndExhibitionId(Long id, Long exId);

  Optional<Reservation> findByIdAndDeletedAtIsNull(Long reservationId);

}
