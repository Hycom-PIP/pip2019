package pl.hycom.surveyservice.dto;

import java.util.List;

public class PageDto {
    private Statistics statistics;
    private List<SurveyDto> pages;

    public PageDto(int surveysAmount, int pagesAmount, List<SurveyDto> pages) {
        this.statistics = new Statistics(surveysAmount, pagesAmount);
        this.pages = pages;
    }

    public Statistics getStatistics() {
        return statistics;
    }

    public void setStatistics(Statistics statistics) {
        this.statistics = statistics;
    }

    public List<SurveyDto> getPages() {
        return pages;
    }

    public void setPages(List<SurveyDto> pages) {
        this.pages = pages;
    }

    public class Statistics {
        private int surveysAmount;
        private int pagesAmount;

        public Statistics(int surveysAmount, int pagesAmount) {
            this.surveysAmount = surveysAmount;
            this.pagesAmount = pagesAmount;
        }

        public int getSurveysAmount() {
            return surveysAmount;
        }

        public void setSurveysAmount(int surveysAmount) {
            this.surveysAmount = surveysAmount;
        }

        public int getPagesAmount() {
            return pagesAmount;
        }

        public void setPagesAmount(int pagesAmount) {
            this.pagesAmount = pagesAmount;
        }
    }
}