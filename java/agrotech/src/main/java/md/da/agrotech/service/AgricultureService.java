package md.da.agrotech.service;

import lombok.RequiredArgsConstructor;
import md.da.agrotech.DTO.CadastruCropDTO;
import md.da.agrotech.DTO.CadastruLivestockDTO;
import md.da.agrotech.DTO.CropDTO;
import md.da.agrotech.DTO.LivestockDTO;
import md.da.agrotech.entity.Cadastru;
import md.da.agrotech.entity.Crop;
import md.da.agrotech.entity.Livestock;
import md.da.agrotech.entity.Raion;
import md.da.agrotech.repository.*;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AgricultureService {

    private final RaionRepository raionRepository;
    private final CadastruRepository cadastruRepository;
    private final LivestockRepository livestockRepository;
    private final AgricultureRepository agricultureRepository;

    public Flux<Raion> getAllRaions() {
        return raionRepository.findAll();
    }

    public Mono<Raion> getRaionById(Long id) {
        return raionRepository.findById(id);
    }

    public Flux<Cadastru> getCadastruByUserId(String userId) {
        return cadastruRepository.findByUserId(userId);
    }

    public Mono<Cadastru> createCadastru(Cadastru cadastru) {
        return cadastruRepository.save(cadastru);
    }

    public Mono<Cadastru> getCadastruById(Long id) {
        return cadastruRepository.findById(id);
    }

    public Flux<CadastruCropDTO> getCadastruByCrop(String crop) {
        return agricultureRepository.findByCropName(crop);
    }

    public Flux<CadastruLivestockDTO> getCadastruByLivestock(String livestock) {
        return agricultureRepository.findByLivestockName(livestock);
    }

    public Flux<CropDTO> getCropByCadastru(Long id) {
        return agricultureRepository.findByCadastruId(id);
    }

    public Flux<LivestockDTO> getLivestockByCadastru(Long id) {
        return agricultureRepository.findLivestockByCadastruId(id);
    }

    public Flux<Cadastru> getCadastres() {
        return cadastruRepository.findAll();
    }
}
