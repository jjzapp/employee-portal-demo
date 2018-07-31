package employeeportal;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import employeeportal.domain.Employee;
import employeeportal.repository.EmployeeRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
public class EmployeeRestControllerTest {


    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    private List<Employee> employeeList = new ArrayList<>();

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
            .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
            .findAny()
            .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }

    @Before
    public void setup() throws Exception {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();

        this.employeeRepository.deleteAllInBatch();

        this.employeeList.add(employeeRepository.save(new Employee(100L, "Alan", 150L)));
        this.employeeList.add(employeeRepository.save(new Employee(150L, "Jamie", 0L)));        
    }

    @Test
    public void employeeNotFound() throws Exception {
        mockMvc.perform(get("/api/employees/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void readSingleEmployee() throws Exception {
        mockMvc.perform(get("/api/employees/" + this.employeeList.get(0).getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(this.employeeList.get(0).getId().intValue())))
                .andExpect(jsonPath("$.name", is(this.employeeList.get(0).getName())))
                .andExpect(jsonPath("$.managerId", is(this.employeeList.get(0).getManagerId().intValue())));
    }

    @Test
    public void readEmployees() throws Exception {
        mockMvc.perform(get("/api/employees/"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(this.employeeList.get(0).getId().intValue())))
                .andExpect(jsonPath("$[0].name", is(this.employeeList.get(0).getName())))
                .andExpect(jsonPath("$[0].managerId", is(this.employeeList.get(0).getManagerId().intValue())))
                .andExpect(jsonPath("$[1].id", is(this.employeeList.get(1).getId().intValue())))
                .andExpect(jsonPath("$[1].name", is(this.employeeList.get(1).getName())))
                .andExpect(jsonPath("$[1].managerId", is(this.employeeList.get(1).getManagerId().intValue())));
    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }
}
