package com.stackroute.reportservice.service;

import com.stackroute.reportservice.model.DatabaseSequence;
import com.stackroute.reportservice.model.Organs;
import com.stackroute.reportservice.model.Report;
import com.stackroute.reportservice.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportServiceImplementation implements ReportService {
    @Autowired
    MongoOperations mongoOperations;

    ReportRepository reportRepository;


    @Autowired
    public ReportServiceImplementation(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @Override
    public List countDonorRegistrations() {
        int donorCount = 0;
        List list = new ArrayList();
        List<Report> reports = reportRepository.findAll();
        for (Report report : reports) {
            if (report.getUserType() != null && report.getUserType().equals("donor")) {
                donorCount++;
            }

        }
        System.out.println("donorCount is " + donorCount);
        list.add(donorCount);
        System.out.println(list);
        return list;
    }


    @Override
    public List countRecepientRegistrations() {
        int recepientCount = 0;
        List list = new ArrayList();
        List<Report> reports = reportRepository.findAll();
        System.out.println(reports);
        for (Report report : reports) {
            System.out.println(report);
            if (report.getUserType() != null && report.getUserType().equals("recepient")){
                recepientCount++;
            }


        }
        System.out.println("recepientCount is " + recepientCount);

        list.add(recepientCount);

        System.out.println(list);
        return list;
    }

    @Override
    public List numberOfOrganDonations() {
//
        int bloodCount = 0, boneMarrowCount = 0, corneaCount = 0,
                heartCount = 0, kidneyCount = 0, liverCount = 0,
                lungsCount = 0, plateletCount = 0;
        List list = new ArrayList();
        List<Report> reports = reportRepository.findAll();
        for (Report report : reports) {
            if(report.getMedicalDetails() != null) {
                List<Organs> organs = report.getMedicalDetails().getOrgans();
                for (Organs organ : organs) {
//

                    if ((organ.getName().equals("blood")  || organ.getName().equals("Blood")) && organ.isDonateOrNot()) {
                        bloodCount++;
                    }

                    if ((organ.getName().equals("bone marrow") || organ.getName().equals("Bone Marrow")) && organ.isDonateOrNot()) {
                        boneMarrowCount++;
                    }
                    if ((organ.getName().equals("cornea") || organ.getName().equals("Cornea")) && organ.isDonateOrNot()) {
                        corneaCount++;
                    }
                    if ((organ.getName().equals("heart") || organ.getName().equals("Heart"))  && organ.isDonateOrNot()) {
                        heartCount++;
                    }
                    if ((organ.getName().equals("kidney") || organ.getName().equals("Kidney"))  && organ.isDonateOrNot()) {
                        kidneyCount++;
                    }
                    if ((organ.getName().equals("liver") || organ.getName().equals("Liver")) && organ.isDonateOrNot()) {
                        liverCount++;
                    }
                    if ((organ.getName().equals("lungs") || organ.getName().equals("Lungs")) && organ.isDonateOrNot()) {
                        lungsCount++;
                    }
                    if ((organ.getName().equals("platelet") || organ.getName().equals("Platelet")) && organ.isDonateOrNot()) {
                        plateletCount++;
                    }
//
//
                }
            }
        }

        list.add(bloodCount);
            list.add(boneMarrowCount);
            list.add(corneaCount);
            list.add(heartCount);
            list.add(kidneyCount);
            list.add(liverCount);
            list.add(lungsCount);
            list.add(plateletCount);

        System.out.println(list);


        return list;

    }

    @Override
    public long getNextSequenceId(String key) {

        Query query = new Query(Criteria.where("_id").is(key));
        Update update = new Update();
        update.inc("seq", 1);
        FindAndModifyOptions options = new FindAndModifyOptions();
        options.returnNew(true);
        DatabaseSequence seqId = mongoOperations.findAndModify(query, update, options, DatabaseSequence.class);
        return seqId.getSeq();

    }





//    @Override
//    public List numberOfOrganDonations() {
//        int organdonationCount = 0;
//        List list = new ArrayList();
//        List<Report> reports = reportRepository.findAll();
//        for (Report report : reports) {
//
//
//            List<Organs> organs = report.getMedicalDetails().getOrgans();
//            for (Organs organ : organs) {
////                if (report.getMedicalDetails().getOrgans().get().getName().equals("blood") && report.getMedicalDetails().getOrgans().get(0).isDonateOrNot() == true) {
////                    bloodCount++;
////                }
//
//                if (organ.isDonateOrNot() == true) {
//                    organdonationCount++;
//                }
//
//
//            }}
//            System.out.println("organdonationCount is " + organdonationCount);
//
//            list.add(organdonationCount);
//
//            System.out.println(list);
//            return list;
//        }
    }



